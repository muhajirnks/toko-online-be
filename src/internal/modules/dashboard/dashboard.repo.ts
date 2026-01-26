import User from "@/internal/models/user";
import Store from "@/internal/models/store";
import Product from "@/internal/models/product";
import Order from "@/internal/models/order";

export const getAdminStats = async () => {
   const [totalUsers, totalStores, totalProducts, totalOrders, revenueData] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Store.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
         { $match: { status: { $ne: "cancelled" } } },
         { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
      ])
   ]);

   return {
      totalUsers,
      totalStores,
      totalProducts,
      totalOrders,
      totalRevenue: revenueData[0]?.totalRevenue || 0,
   };
};

export const getSellerStats = async (storeId: string) => {
   const [totalProducts, orders] = await Promise.all([
      Product.countDocuments({ store: storeId }),
      Order.find({ "items.product": { $exists: true } })
         .populate({
            path: "items.product",
            match: { store: storeId }
         })
         .lean()
   ]);

   // Filter orders that actually contain products from this store
   const sellerOrders = orders.filter(order => 
      order.items.some(item => item.product && (item.product as any).store?.toString() === storeId)
   );

   const totalOrders = sellerOrders.length;
   
   // Calculate revenue only for items belonging to this store
   let totalRevenue = 0;
   sellerOrders.forEach(order => {
      if (order.status !== "cancelled") {
         order.items.forEach(item => {
            if (item.product && (item.product as any).store?.toString() === storeId) {
               totalRevenue += item.price * item.quantity;
            }
         });
      }
   });

   // Get recent orders (last 5)
   const recentOrders = sellerOrders
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

   return {
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
   };
};
