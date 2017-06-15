//g Following the commonJS practice of exports

const router = (function router(){
    var exports = {};

    const checkURI = function(routes) {
        // routes - arrray of required routes
        // eg: ["timeline", "speakers", "contact"]

        if (!routes){
            console.error("Pass in routes array.");
            return;
        }

        // in url '/timeline/' - timeline will be the path string
        var path = location.pathname.split("/")[1];
        var index = routes.indexOf(path);
        if (path === "")
            changeContent("home");
        else if (index === -1)
            return false;
        else
            changeContent(path);
    }

    const changeContent = function(path) {
        // path - path to show
        const routeId = "#" + path + "-route";
        var routeContainer = $("#route-container");
        var routeDiv = $(routeId);
        exports.routeDiv = routeDiv;
        if (!routeContainer.length) {
            console.error("Route container not found.");
            return;
        } else if (!routeDiv.length) {
            console.error(path, " route div not found.");
            return;
        }

        // Hide the current route div
        routeContainer.children(".route").hide();
        // Show the new route div
        routeDiv.show();
        return setActiveNav(path);
    }

    const setActiveNav = function(path) {
        const navClass = "." + path + "-nav";
        var navElement = $(navClass);
        // Remove the previous is-active
        $(".router-navs").children('li').removeClass("is-active");
        // Set the new is-active
        if (!navElement.length){
            console.error("No navbar items found.");
            return;
        }
        navElement.addClass("is-active");
        // end of routing chain;
        return true;
    }

    const routeHandler = function(to) {
        // Return if the given route is not there
        if (routes.indexOf(to) === -1 && to !== "home"){
            console.error(to, " route not declared.");
            return;
        }
        // prepend and append '/' 
        var path = "/" + to + "/";
        // Add exception for home
        if (to === "home")
            path = "/";
        history.pushState(null, null, path);
        checkURI(routes);
    }

    const activateRouteLinks = function(routes) {
        const routeLinks = $(".route-link");
        if (!routeLinks.length)
            return;
        routeLinks.on("click", function(e) {
            e.preventDefault();
            var to = $(this).data("go-to");
            routeHandler(to);
        });
    }

    exports.init = function(routes) {
        // Sets up routing
        checkURI(routes);
        activateRouteLinks();
    }

    return exports;
})();
