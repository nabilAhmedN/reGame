import React from 'react';

const BlogCard = ({ blog }) => {
    const { question, imgURL, answer } = blog
    return (
        <div className="max-w-auto p-4 shadow-md">
            <div className="space-y-4">
                <div className="space-y-2">
                    <img src={imgURL} alt={answer} className="block object-cover object-center w-full rounded-md h-72" />
                </div>
                <div className="space-y-2">
                    <div className="block">
                        <h3 className="text-xl font-semibold">{question}</h3>
                    </div>
                    <p className="leading-snug">{answer}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;