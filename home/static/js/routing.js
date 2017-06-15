// Following the commonJS practice of exports

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
        // Remove the previous is-active
        $(".router-navs").children('li').removeClass("is-active");
        // Set the new is-active
        $(navClass).addClass("is-active");
    }

    exports.init = function(routes) {
        // Sets up routing
        checkURI(routes);
    }
    return exports;
})();
