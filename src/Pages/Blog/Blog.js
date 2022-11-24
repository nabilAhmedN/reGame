import React from 'react';

const Blog = () => {
    return (
        <section className="bg-white ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-4 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 ">
                        Blog
                    </h2>
                    <p className="font-normal text-gray-500 sm:text-xl dark:text-gray-700">
                        Basic Question about Frontend and Server
                    </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <article className="p-6 rounded-lg border shadow-md bg-gray-800">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                            What are the different ways to manage a state in a
                            React application?
                        </h2>
                        <p className="mb-5 font-normal text-gray-300">
                            <span className="font-bold text-base">
                                The Four Kinds of React State to Manage
                            </span>
                            <br />
                            <span className="font-semibold text-lg">
                                1. Local state:{" "}
                            </span>
                            <span className="font-medium">
                                Local state is data we manage in one or another
                                component. Local state is most often managed in
                                React using the useState hook.
                            </span>
                            <br />
                            <span className="font-semibold text-lg">
                                2. Global state:{" "}
                            </span>
                            <span className="font-medium">
                                Global state is data we manage across multiple
                                components. Global state is necessary when we
                                want to get and update data anywhere in our app,
                                or in multiple components at least.
                            </span>
                            <br />
                            <span className="font-semibold text-lg">
                                3. Server state:{" "}
                            </span>
                            <span className="font-medium">
                                Data that comes from an external server that
                                must be integrated with our UI state. Server
                                state is a simple concept, but can be hard to
                                manage alongside all of our local and global UI
                                state.
                            </span>
                            <br />
                            <span className="font-semibold text-lg">
                                4. URL state:{" "}
                            </span>
                            <span className="font-medium">
                                Data that exists on our URLs, including the
                                pathname and query parameters. URL state is
                                often missing as a category of state, but it is
                                an important one. In many cases, a lot of major
                                parts of our application rely upon accessing URL
                                state.
                            </span>
                        </p>
                    </article>
                    <article className="p-6 rounded-lg border shadow-md bg-gray-800">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                            How does prototypical inheritance work?
                        </h2>
                        <p className="mb-5 font-semibold text-gray-300">
                            Every object with its methods and properties
                            contains an internal and hidden property known as
                            [[Prototype]]. <br /> The Prototypal Inheritance is
                            a feature in javascript used to add methods and
                            properties in objects. It is a method by which an
                            object can inherit the properties and methods of
                            another object. Traditionally, in order to get and
                            set the [[Prototype]] of an object, we use
                            Object.getPrototypeOf and Object. <br />{" "}
                            setPrototypeOf. Nowadays, in modern language, it is
                            being set using __proto__.
                        </p>
                    </article>
                    <article className="p-6 rounded-lg border shadow-md bg-gray-800">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                            What is a unit test? Why should we write unit tests?
                        </h2>
                        <p className="mb-5 font-semibold text-gray-300">
                            A unit test is a way of testing a unit - the
                            smallest piece of code that can be logically
                            isolated in a system. In most programming languages,
                            that is a function, a subroutine, a method or
                            property. <br />
                            They enable you to catch bugs early in the
                            development process. Automated unit tests help a
                            great deal with regression testing. They detect code
                            smells in your codebase. For example, if you're
                            having a hard time writing unit tests for a piece of
                            code, it might be a sign that your function is too
                            complex.
                        </p>
                    </article>
                    <article className="p-6 rounded-lg border shadow-md bg-gray-800">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                            React vs. Angular vs. Vue?
                        </h2>
                        <p className="mb-5 font-normal text-gray-300">
                            Angular: Angular has a steep learning curve,
                            considering it is a complete solution, and mastering
                            Angular requires you to learn associated concepts
                            like TypeScript and MVC. Even though it takes time
                            to learn Angular, the investment pays dividends in
                            terms of understanding how the front end works.
                            <br />
                            React: React offers a Getting Started guide that
                            should help one set up React in about an hour. The
                            documentation is thorough and complete, with
                            solutions to common issues already present on Stack
                            Overflow. React is not a complete framework and
                            advanced features require the use of third-party
                            libraries. This makes the learning curve of the core
                            framework not so steep but depends on the path you
                            take with additional functionality.
                            <br />
                            Vue: Vue provides higher customizability and hence
                            is easier to learn than Angular or React. Further,
                            Vue has an overlap with Angular and React with
                            respect to their functionality like the use of
                            components. Hence, the transition to Vue from either
                            of the two is an easy option. 
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Blog;