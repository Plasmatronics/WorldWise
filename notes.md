## PERFORMANCE OPTIMIZATION TOOLS

# 1). PREVENT WASTED RENDERS

use Memo, useCallback
passing elements as children or regular props

# 2). Improve App Speed and Responsiveness

useMemo, useCallback,useTransition

# 3). Reduce Bundle Size

limit 3rd party packages
codesplitting and lazyLoading

# WHEN DOE A COMPONENT INSTANCE RE-RENDER

when state changes, a context changes, or a parent re-renders
A render DOES NOT mean the DOM actually gets updated, its just the component functions gets callled...but this can be an expensive operation.

Wasted Render: a render that didnt produce any change in the DOM (not ALWAYS worth fixing)

## PROFILER DEVELOPER TOOL

Allows you to see how long component isntances take to render and why they re-render.

## PERFORMANCE OPTIMIZATION TRICK

the actual worked on version of Atomic Blog is on laptop... so bare with me here
Go to Test.js and look at the SlowComponent
So lets say we have a component thats the child of a component: parent (Printer), Child(Color)
Lets say Printer has state that Color does not actually need to function... this will mean
that Color will get re-rendered unnecsarily everytime Printer gets re-rendered due to state change.
Problem: we still want Printer to render Color, but not have Color re-render upon every state change
Solution: Change the parent of Color so its not constantly re-rendered, then pass COlor into Printer as a child.
This exploits the fact that "CHILDREN" arent actually child components of whatever accepts them... remember: components have no clue of the children that pass through them.
In this way, Color can now pass into Printer AFTER Printer gets created. Therefore, Color will not be constantly re-rendered.

## WHAT IS MEMOIZATION

memoizaation: an optimization technique that executes a pure function once and
and saves the result in memory... if we try to execute the function again with the same arguements asd before, the previously saved result will be returned wO executing the function again.

So in essence, this function is called then that result is stored in a cache, and if future calls are equal to that cahce, the function will not be called again and that cache will be returned.
Cachce is overwriten upon a change of arguements (idk if this is true)
THis is because with the same arguements A PURE FUNCTION will ALWAYS return the same result

In React, we can use memo to create a component that will not re-render when its parent re-renders, as long as trhe props stau the same between renders.
memo only affects props, a component that is memoized will still re-render when its own state changes or whena context that its subcribed to changes.

This doesnt mean Memo ALL your components-->only makes sense when the components is heavy, rerenders often, adn does so with the same props
using Memo can also decrease readiability so only use when youa ctually need to./
LETS go see memoizing in practice

## UNDERSTAINDING USEMEMO AND USECALLBACK

# An issue with MEMO:

In react, everything is re-created on every render (including objects and functions)
In JavaScript two objcets or functions that look the same, are actually different
If objects or functions are passed as props, the child component will always see them as snew props on each re-renders
Therefore, if props are diff between re-renders, memo will not work

Solution: we need to memoize objects and functions, to preserve/make them stable between re-renders.
to do this: useMemo and useCallback

useMemo is for any value we want to preserve between renders
useCllback is for to memoize functions between renders
useCallback is actually j a special case of useMemo
Values passed into useMemo and useCallback will be stored in memory ("cachec")
and returned in subsequent re-renders, as long as dependencies ("inputs") stay the same.

just like useEffect, useMemo and useCallback have dependency arrays: whenever one depndency changes, the value will be re-created instead of being returned from the cache.

useMemo will instantly call its continer, while useCallback does not necceasirly do this
state setter functions are AUTOMATICALLY MEMOIZED!!! this is why we dont have to stick them in depndency arrays

# When to use useMemo and useCallback?

1). Memoizing props to prevent wasted renders (togther with memo)
2). Memoizing values to avoid expensive re-calucaltion on every render
3). memoizing values that are used in dependency array of another## UNDERSTAINDING USEMEMO AND USECALLBACK hook

## Optimizing Contexts

ONLY NEED TO DO THIS IF ALL 3 OF THE FOLLOWING ARE TRUE:
1). The state in the context needs to change all the time
2), the context has many consumers
3). the app is very laggy

This is not mandatory but be aware: if we do not memoize the values passed into the Context.Provider, then
everytime one of the values change, it will cause the whole context to change and thus get re-rendered bc the values are an object.

## OPTIMIZING BUNDLE SIZE WITH CODE SPLITTING

when a user goes to our app, they are visiting a website that is hosted a server
When the user gets to the app, the server sends a huge js file to the client on initial render: the bundle.
Downloading the bundle renders our entire app at once
Its called a bundle bc our bundling tool (weve used create-react-app and Vite)
have bundled all our development files into one huge bundle.
This turns the app into a SPA on the client side. When some interaction happens,
its all already on the client side, so nothing new needs to be loaded from the server,

Code Splitting: spliting the bundle into multiple parts that can be downloaded over time as they are necessary for the application to run (lazy-loading).
The most common way to split code is at the Route level.
This is to say, split the code for every page.

lets go implement some optimization via React built in lazy feature, which dynamically imports modules, rather than just importing them instnatly.
We want a spinner while waiting for this data--> React's Suspense API, allows components to wait for something to happen

Doing this, in WorldWise, took us from 572kb on initial Render to much less per Route.
Bundle size stays the same but time to initial render decreases.

## OPTIMIZING DO AND DONTS

# DONT OPTIMIZE PREMATURELY

DOING THIS CAN DO MORE HARM THAN GOOD--> optimization techniques themselves very often use some small amt of reources

DONT...
if app is working fine, dont need to optimize
Dont wrap all components in memos or all values in useMemo
Dont wrap all functions in useCallback
Dont optimize context if its not slow, and doesnt have many consumers.

DO...
find performance bottlenecks using the PRofiler or visual inspection (laggy UI)
Fix those real performance issues, expensive re-renders, expensive calculations, and context value+child components
Optimnize context if it has many consumers and changes often
Implement code splitting and lazy loading for SPA routes.

## useEffect Rules and Best Practices

# useEffect Dependency Array Rules

Every state variable, prop used inside the effect MUST be included in the dependency array
ALSO: WE MUST INCLUDE all context values and "reactive values"
reactive valuess: any function or variable that reference any other reactive value
all values that are somehow connected to state, props, or context are "reactive values"
Goal of this: to avoid stale closures (more on that later)
DO NOT use objects or arrays as dependencies... objects and arrays are recreated on eafch render.
If you REALLY do need an object or array as a dependency, well cover this later\

So, how do we go about removing unnecessary dependencies--> DONT stright up jsut remove it and "lie" to React
Removing Function DEpendendcies:
Move function in to the effect itself
if you need the function in multiple places, memoize it
if the function doesnt reference any reactive value, move it out of the component!

Removing Object DEpendencies:
Try a strategy we applied for functions
Instead of including the entire objects, include only the properrties you need (primitive values)

Other Strategies
If you have multiple related reactive values as dependendies, try useReducer
You dont need to include setState and dispatches in the dependencies as React guarantess them to be stable between renders.

WHEN TO NOT USE AN EFFECT
USE EFFECTS AS A LAST RESORT!!!
React calls them "a last resort esacpe hatch to step outside of React"
Big use Cases where effects are overrusd:
1).Responsing to a user event; an event handler should be used instead
2).fetching data on component mount; this is fine in small apps (we did this), but in real world apps, a library like React Query should be used.
3).Synchronizign state changes with one another(setting state based on another state variable);try using derived state and eventHandlers...this can often cause multiple unnecessary renders.
