import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import { CitiesProvider } from "./contexts/CitiesContexts";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { Suspense, lazy } from "react";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                {/* DEFAULT IF NONE OTHER FOUND IN THE NEST */}
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
                {/* NESTED ROUTES...dont have to include the parent path */}
              </Route>
              <Route path="*" element={<PageNotFound />} />
              {/* this is how you setup a page not found page */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

// what is routing?
/* with routing, we match different URLS to different React components
in this way we are routing differnt URLS to different UI views
This enables users to navigate between different application screens, using the browsing url
keeps the UI in sync with the current browser URL
THIS IS CLIENT-SIDE ROUTING
A lot of frameworks have routing built-in
but React, another reason perhaps why it is a libarry, needs React Router
This is likely Reacts most used 3rd party plugin
Routing enables us to build SPAs
*/
// SPA (SINGLES PAGE APPS)//
/*
SPAS are applications taht are executely entirely on the client (the browser)
whenever a user clicks on a link to change the URL, React router chagnes the URl and the DOM is updaed.
javascript (react) is used to update the page (DOM) and thus the page is never reloaded... so it gfeels like a native app
  Upon URL change, the React component correspongint to the new URL is rendered.
Additional data might be loaded from a web api, this is still an API as long as a completely new page is not loaded... then it is not a SPA
All we have done up to this point is an SPA... but big and complex applications need React ROuter to become an SPA.
*/

// Styling options in React//
/*
React want to stay unopinionated abt development, which is why they give you so many diff ways to style
Styling Options:
  Inline CSS (APPLY in JSX elements WITH style prop, SCOPED TO the jsx element BASED ON Css)
  Sass/CSS File (APPLY in external file WITH className prop, SCOPED TO the entire app(global) BASED ON Css)
    global scoped styling can be a problem in bigger applications bc it can be difficult to know which components use whcih classes
      when you update one of the classes it will have reprocussions in other components, or if a devloper creates a newe class
      with a name that already exists, clashes will occur... basically large apps HATE global scope
  CSS MODULES(APPLY one external file per component WITH className prop, SCOPED to the component, BASED ON Css)
    This solves the css/sass file's "global scope problem"... this better represents React's Seperation of COncerns
    This makes components more re-usbale---> the point of React
    They come out of the box with create-react-app and Vite
  CSS-in-JS (APPLY in external file or component file, WITH creating new component, scoped to the component, based on JS)
     This is where we woulkd write css in a  js file... it allows us to create React components that have our styles directly applied to them
      This FULLY EMBRACES the react philosphy that components should CONTAIN EVERYTHING AB THEIR APPEARANCE
  There are Utility-first CSS, like Tailwind(APPLYED IN jsx elements, WITH className prop, scoped to the element, BASED on CSSS)
  LASTLY, there are UI Libraries that allow you to avoid CSS Altogether, like Chakra UI, Material UI, or Mantine
  */

// NESTED ROUTES//
/*
  We need nested routes when we want part of the UI to be controlled by part of the url
  to implement where we show part of the UI based off some part of the URL
  nested routes are NOT simply routes that have multiple parts..
    Its a nested route bc this the path influences something inside the arleady existing component
  How do we know where these elements going to be displayed---> Outlet, provided by React Router
    */

// THE URL FOR STATE MANANGEMENT
/*
We are ALSO able to store state in a url....
The url is an excellent place to store UI state and an alternative to useSTate
in some situations
Examples: open/closed panels, currently selected list item, list sorting order......

but why?
  Its an easy way to store state in a global place, accessible to all components in the app
  Good way to pass data from one page into another
  Makes it possible to bookmark and share this page with the exact UI state it had at the time

  We can do this using React router
    The whole url is NOT state.... the path can be considered state bc it corresponds to the component that is being displayed
      ...this is not what we mean though
    We prefer to store it after-- in the params or the query-string
      parameters is useful to pass data to the next page
      query-string is useful to store data that should be availbale anywhere

  3 steps to use params w React ROuter:
    1). create a new route
    2).link to that route
    3). in that route we read the state from the url
      */

// Lets implement programatic navigation: changing the url through an action other than clickinga  link//
