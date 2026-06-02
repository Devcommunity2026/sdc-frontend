import React from 'react'

const TableHeader = ({ data }) => {
    return (
        <div
            className=" grid grid-cols-5 gap-4  px-6 py-4  border-b border-border dark:border-dark-border bg-secondary dark:bg-dark-secondary
                            text-sm font-semibold text-secondary-foreground dark:text-dark-secondary-foreground "
        >
            {data.map((item, i) => (
                <p>{item}</p>
            ))}
        </div>
    )
}

export default TableHeader
