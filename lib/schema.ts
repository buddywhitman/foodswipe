import { pgTable, serial, varchar, text, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core"
// --- Core Tables ---
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }),
  name: varchar("name", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  avatar: text("avatar"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  cuisine: varchar("cuisine", { length: 100 }),
  image: text("image"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  restaurantId: integer("restaurant_id").notNull().references(() => restaurants.id),
  status: varchar("status", { length: 50 }).notNull(),
  total: real("total").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ... existing tables ...

// Coupons
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 20 }).notNull(), // 'fixed' or 'percentage'
  discount: real("discount").notNull(),
  maxDiscount: real("max_discount"), // for percentage coupons
  minOrder: real("min_order"), // minimum order amount
  usageLimit: integer("usage_limit"), // total usage limit
  usageCount: integer("usage_count").default(0),
  userUsageLimit: integer("user_usage_limit").default(1), // per user limit
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date", { withTimezone: true }),
  expiryDate: timestamp("expiry_date", { withTimezone: true }),
  applicableRestaurants: jsonb("applicable_restaurants"), // array of restaurant IDs
  applicableCategories: jsonb("applicable_categories"), // array of category IDs
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Coupon Usage
export const couponUsage = pgTable("coupon_usage", {
  id: serial("id").primaryKey(),
  couponId: integer("coupon_id")
    .notNull()
    .references(() => coupons.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  orderId: integer("order_id").references(() => orders.id),
  discountAmount: real("discount_amount").notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }).defaultNow(),
})

// Admin Users
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(), // 'super-admin', 'restaurant-manager', 'content-moderator'
  permissions: jsonb("permissions"), // array of permission strings
  restaurantId: integer("restaurant_id").references(() => restaurants.id), // for restaurant managers
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Delivery Partners
export const deliveryPartners = pgTable("delivery_partners", {
  id: serial("id").primaryKey(),
  phone: varchar("phone", { length: 20 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }),
  avatar: text("avatar"),
  vehicleType: varchar("vehicle_type", { length: 50 }), // 'bike', 'car', 'bicycle'
  vehicleNumber: varchar("vehicle_number", { length: 20 }),
  licenseNumber: varchar("license_number", { length: 50 }),
  rating: real("rating").default(5.0),
  totalDeliveries: integer("total_deliveries").default(0),
  isActive: boolean("is_active").default(true),
  isOnline: boolean("is_online").default(false),
  currentLocation: jsonb("current_location"), // {lat, lng}
  bankDetails: jsonb("bank_details"),
  documents: jsonb("documents"), // license, vehicle registration, etc.
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Delivery Assignments
export const deliveryAssignments = pgTable("delivery_assignments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  deliveryPartnerId: integer("delivery_partner_id")
    .notNull()
    .references(() => deliveryPartners.id),
  status: varchar("status", { length: 50 }).notNull(), // 'assigned', 'accepted', 'picked_up', 'delivered', 'cancelled'
  assignedAt: timestamp("assigned_at", { withTimezone: true }).defaultNow(),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  pickedUpAt: timestamp("picked_up_at", { withTimezone: true }),
  deliveredAt: timestamp("delivered_at", { withTimezone: true }),
  cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
  cancellationReason: text("cancellation_reason"),
  deliveryFee: real("delivery_fee"),
  tips: real("tips").default(0),
  notes: text("notes"),
})

// User Addresses
export const userAddresses = pgTable("user_addresses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  pincode: varchar("pincode", { length: 20 }),
  landmark: varchar("landmark", { length: 255 }),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})
