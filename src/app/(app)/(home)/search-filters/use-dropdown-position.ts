import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLButtonElement>) => {
 
    const getDropdownPosition = () => {
        if(!ref.current) {
            return { top: 0, left: 0 };
        }

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // width of dropdown w-60 = 15rem = 240px

        // Calculate the left position to center the dropdown under the button
        let left = rect.left + window.scrollX;
        let top = rect.bottom + window.scrollY;

        if(left + dropdownWidth > window.innerWidth) {
            // If the dropdown goes beyond the right edge of the viewport, adjust the left position
            left = rect.right - window.scrollX - dropdownWidth;

            if(left < 0) {
                left = window.innerWidth - dropdownWidth - 16// If it still goes beyond the left edge, align to the right edge

            }

        }

        if (left < 0){
            left = 16
        }

        return { top, left };

    }
    
    return { getDropdownPosition };

}