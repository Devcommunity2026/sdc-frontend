import React from 'react'

const Slider = ({ type, curr, setCurr, setPage }) => {
    return (
        <div
            className="inline-flex flex-wrap gap-2 p-1 rounded-xl bg-secondary dark:bg-dark-secondary border border-border
                        dark:border-dark-border w-fit"
        >
            {type.map((item, index) => (
                <button
                    key={index}
                    onClick={() => {
                        setCurr(item);
                        setPage(1);
                    }}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                                
                                ${curr === item
                            ? "bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground shadow-md"
                            : "text-secondary-foreground dark:text-dark-secondary-foreground hover:bg-muted dark:hover:bg-dark-muted"
                        }
                                `}
                >
                    {item}
                </button>
            ))}
        </div>
    )
}

export default Slider
