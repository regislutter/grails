var React = require('react');
var Sidebar = require('react-sidebar');

var ResponsiveSidebar = React.createClass({
    getInitialState() {
        return {
            sidebarOpen: false,
            sidebarDocked: false
        };
    },

    getDefaultProps: function() {
        return {
            styles: {
                root: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'hidden',
                },
                sidebar: {
                    zIndex: 2,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    transition: 'transform .3s ease-out',
                    WebkitTransition: '-webkit-transform .3s ease-out',
                    willChange: 'transform',
                    overflowY: 'auto',
                },
                content: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: 'auto',
                    transition: 'left .3s ease-out, right .3s ease-out',
                },
                overlay: {
                    zIndex: 1,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'opacity .3s ease-out',
                    backgroundColor: 'rgba(0,0,0,.3)',
                },
                dragHandle: {
                    zIndex: 1,
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                },
            }
        }
    },

    onSetSidebarOpen: function(open) {
        this.setState({sidebarOpen: open});
    },

    componentWillMount: function() {
        var mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, sidebarDocked: mql.matches});
    },

    componentWillUnmount: function() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    mediaQueryChanged: function() {
        this.setState({sidebarDocked: this.state.mql.matches});
    },

    render: function() {
        var sidebarContent = <b>Sidebar content</b>;

        return (
            <Sidebar sidebar={sidebarContent}
                     open={this.state.sidebarOpen}
                     docked={this.state.sidebarDocked}
                     onSetOpen={this.onSetSidebarOpen}>
                <b>Main content</b>
            </Sidebar>
        );
    }
});

module.exports = ResponsiveSidebar;