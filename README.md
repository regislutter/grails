# Slidr

## How to install & run

- Run the command `npm install`
- Run the command `npm run start`
- Visit `http://localhost:8080`

## Libraries

This project use some libraries to enhanced his features and design:

### React

- React Swipeable Views: [https://github.com/oliviertassinari/react-swipeable-views]
- React Sidebar: [https://github.com/balloob/react-sidebar]

### JavaScript

- SweetAlert2: [https://limonte.github.io/sweetalert2/]

### HTML/CSS

- Bootstrap 4 (alpha): [http://v4-alpha.getbootstrap.com/layout/overview/]

## What are flows and slides ?

Slides are simple page between which you can slide by swiping on touch devices or by click in the menu.

A flow contains a list of slides, and you will not be able to slide to others slides that are not the current displayed flow.

## How to manage flows and slides

### Declare flows

In `app/config/routes` :

Your default flow will be your `IndexRoute`, each other flows are declared as `Route`.
The component will be the slider which will contain all the slides.
The path will be the path in your URL to access to this flow.

```
var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={MainSlider} />
            <Route path="user" component={UserSlider} />
        </Route>
    </Router>
);
```

### Declare sliders

In `ap/containers` :

Create a JS file for each of your flow.
In the `render` method, you will have a `SwipeableViews` component, which will encapsulate each of your slide.
Your slides are also components that you will put in `app/components`.

```
render: function () {
        return (
            <SwipeableViews index={this.props.slide} onChangeIndex={this.props.onChangeIndex} style={this.props.slideStyle} slideStyle={this.props.slideStyle}>
                <Home />
                <Safety />
                <Contact />
            </SwipeableViews>
    )
}
```

### How to implement the menu

To work, each button of the menu will need to be customize to know which slide is concerned.
Each element of your menu need to have :
 - a data-route attribute
 - a data-index attribute
 - the method handleClick() assigned on click
 - a condition in the className to make it active on the right slide

Here is an example :
```
<div data-route="/info" data-index="1" onClick={this.handleClick} className={"btn " + (this.props.route == '/info' && this.props.slide == 2?'active':'')}>Contact</div>
```

#### Dataset attributes

The dataset attributes (data-route and data-index) are used to switch to the right flow and slide when you click on the button.
The `Main.js` component will automatically switch between flows and slides with animations.
The `data-route` attribute will contain the route to the flow that you declared in `route.js`.
The `data-index` attribute will contain the index of the slide (order in the SwipeableViews component).

You don't have to do anything with the `handleClick` method.

#### Condition in className (optional)

To highlight your buttons in the menu, you will need to add a condition in the `className` props.
Of course, fill free to change the name of the class, but here is an example with `active` :

```
className={"btn " + (this.props.route == '/' && this.props.slide == 2?'active':'')}
```

The route and slide value should be the same as in the data-route and data-index attributes, but you can change this for your needs (for example, keep a button active for all slides in the same route)

## How to change menu orientation

Slidr is using flex to display the menu on the top or on the left. By default, the menu is display on the top.
If you want to display it on the left, you will just need to change the `orientation` state value in `getInitialState()` to 'orientation-row'.