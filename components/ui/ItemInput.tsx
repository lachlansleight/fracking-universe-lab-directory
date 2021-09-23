import { useEffect, useState } from "react";

import Downshift, { GetItemPropsOptions, StateChangeOptions } from "downshift";
import { matchSorter } from "match-sorter";
import { FuItem } from "lib/fu-items";
import ItemIcon from "components/fu/ItemIcon";

const ItemInput = ({
    id,
    className = "",
    dropdownClassName = "",
    label,
    error,
    value,
    items,
    onChange,
}: {
    id: string;
    className?: string;
    dropdownClassName?: string;
    label: string;
    error?: string;
    value: FuItem;
    items: FuItem[];
    onChange: (newItem: FuItem) => void;
}): JSX.Element => {
    const [innerValue, setInnerValue] = useState(value || items[0]);

    const handleStateChange = (options: StateChangeOptions<FuItem>) => {
        if (options.selectedItem) setInnerValue(options.selectedItem);
    };

    useEffect(() => {
        if (innerValue) onChange(innerValue);
    }, [innerValue]);

    const getListItems = (
        inputValue: string | null,
        selectedItem: FuItem | null,
        highlightedIndex: number | null,
        getItemProps: (options: GetItemPropsOptions<FuItem>) => any
    ) => {
        if (!inputValue) return [];

        return matchSorter(items, inputValue || "", {
            keys: ["shortDescription"],
        })
            .map((item, index) => {
                return (
                    <li
                        key={item.itemName}
                        {...getItemProps({
                            item: item,
                            index: index,
                            isSelected:
                                selectedItem !== null && item.itemName === selectedItem.itemName,
                        })}
                        className={
                            "text-lg px-2 flex gap-4 items-center " +
                            (index === highlightedIndex
                                ? "bg-white bg-opacity-20 text-yellow-200 font-semibold"
                                : "")
                        }
                    >
                        <ItemIcon item={item} border={true} className="w-6 h-6" />
                        <span>{item.shortDescription}</span>
                    </li>
                );
            })
            .slice(0, 10);
    };

    return (
        <Downshift
            selectedItem={innerValue}
            onStateChange={handleStateChange}
            itemToString={item => (item ? item.shortDescription : "")}
        >
            {({
                getInputProps,
                getMenuProps,
                getItemProps,
                isOpen,
                selectedItem,
                inputValue,
                highlightedIndex,
            }) => (
                <div className="relative flex-grow">
                    <input {...getInputProps({ id, className: className })} />
                    <ul
                        className={`absolute bg-gray-800 w-full top-10 z-20 font-pixel rounded ${dropdownClassName} ${
                            isOpen &&
                            getListItems(inputValue, selectedItem, highlightedIndex, getItemProps)
                                .length > 0
                                ? " border border-white border-opacity-20 rounded rounded-t-none"
                                : ""
                        }`}
                        {...getMenuProps({ open: isOpen })}
                        style={{
                            marginTop: "-0.25rem",
                        }}
                    >
                        {isOpen
                            ? getListItems(inputValue, selectedItem, highlightedIndex, getItemProps)
                            : null}
                    </ul>
                </div>
            )}
        </Downshift>
    );
};

export default ItemInput;
