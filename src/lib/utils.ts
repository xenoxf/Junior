import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility functions for common operations

type ClassValue = string | undefined | null | false;

/**
 * Merge multiple class names conditionally
 */
export function cn(...classes: ClassValue[]): string {
    return twMerge(clsx(classes));
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(date);
}

/**
 * Scroll to element by ID with smooth behavior
 */
export function scrollToId(id: string): void {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

/**
 * Check if element is in viewport
 */
export function isElementInViewport(el: Element): boolean {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
