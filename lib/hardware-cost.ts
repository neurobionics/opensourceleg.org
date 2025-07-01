export interface HardwareCostItem {
  component: string
  price: number
}

export const hardwareCostData: HardwareCostItem[] = [
  {
    component: "Machined Parts",
    price: 5640.00
  },
  {
    component: "Actuators and Batteries", 
    price: 11220.00
  },
  {
    component: "Belts",
    price: 100.00
  },
  {
    component: "Bearings and Fasteners",
    price: 2422.00
  },
  {
    component: "Angular Bearings",
    price: 1736.00
  }
]

export const getTotalCost = (): number => {
  return hardwareCostData.reduce((total, item) => total + item.price, 0)
}

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
} 