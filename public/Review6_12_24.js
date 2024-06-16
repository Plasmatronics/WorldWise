// Use Reducer

//
/*useReducer good when we have multiple interconnected pieces of state or complicated state
we have a "reducer" function that takes two arguements: state, action.
We also have an initial state object with the initial values of all state in the reducer.
we make a switch case based on the action and alter the state in each switch case
In the part of the component where we want the state to be effected we send out a dispatch, and
a payload if need be(in an object)

we initialize the useReducer like this:
const [state, dispatch]=useReducer(reducer, initialState)
 */

// Styling React//
/*
There are many ways
inline--->apply in jsx element, scoped to that element with style prop... can get a bit messy
seperate file--->scoped to the entire project, in a seperate file... this global scoping can cause unforeseen clashes
css module--->The best of inline and seperate file--> scoped to a component, written in a seperate file.
css in js--->(APPLY in external file or component file, WITH creating new component, scoped to the component, based on JS)
utility-first css-->Tailwind, for example. They are scoped to the element, applied on element via className prop
UI Libraries--> these allow us to skip css altogether...Chakra, Mantine are examples of this
*/

// React ROUTER
/*
 We route different components UI to differnt Urls WITHOUT refreshing the page...
 this gives a native app feel
 Allows us to build SPAs

 SPAs
 Single page applications are executed entirely on the client side.
 Reacr outer changes the url and javascript updates the DOM
 Additional data can be loaded from a web API, but a completely new page CANNOT be relaoded...
 this is the entire point of a SPA

 Some Tools React Router gives us... lets look at an example:
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>

BrowserRouter: accivates client-side routing (allows for our app to respond to url changes)
  everything must be within this tag... kinda like <html> in an html doc
  it also manages the history stack, so we can go back and forth and transverse pages in that way

Routes: 
  All the Routes we use must be wrapped in this, it serves as a container for all routes
  With this, the application will now show only one page at a time(it used to be called Switch)
  ensures only the most specific matching component is rendered

Route: an actual individual Route... takes path and the element it will show (in that element we can also pass props)
  the root route (the default, if you will) is marked with "index"
  the default route (if no other pages are matched) is give the value "*" to the path prop
    in our example its the page not found 
 
 Nested Routes: a Route within a route
  if we want a part of our page to change alongside a part of our url... nested route!
  Nested Routes are not SIMPLY ROUTES WITH MULTIPLE PARTS
  we dont have to specify parent path in a nested route
    its a nested route if the path influences something inside the already existing component
    How do we know where these elements are going to be displayed--> Outlet
    
  Some ADDITITONAL ROUTER FEATURES:
  Outlet: Put this where you want nested Routes to be rendered.

  Navigate: change the current location where its rendered
    navigate(-1)--> goes back one page upon its rendering

  Link: WE DO NOT USE HTMLS HREF TO GO TO DIFFERNT PAGES VIA LINK
  We use React Router's Link: it has a "to" prop pointing to its destination upon clicking the link

  NavLink: similar to link but shows usage (if already clicked, etc...)

  useSearchParams: used to modify the query string for the current location
  returns an array of search param, and a function to update it (like useState)
    
    */
