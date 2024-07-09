import { type ClassValue, clsx } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatMoney(amount:number){
  return Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"BDT"
  }).format(amount)
}

export function relativeData(from:Date){
  return formatDistanceToNowStrict(from,{addSuffix:true})
}