var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

var Menu = React.createClass({
    propTypes: {
        onClickMenu: PropTypes.func.isRequired
    },
    getDefaultProps: function() {
        return {
            route: '/',
            slide: 0
        }
    },
    handleClick: function (e) {
        this.props.onClickMenu(e.target.dataset.route, parseInt(e.target.dataset.index));
    },
    render: function () {
        return (
            <header className={this.props.orientation}>

                <div className={"flex-container " + this.props.orientation}>
                    <nav className={"navbar navbar-dark bg-faded"}>
                        <a className="navbar-brand" href="#">Navbar</a>
                        <ul className="nav navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                        <form className="form-inline pull-xs-right">
                            <input className="form-control" type="text" placeholder="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </nav>
                </div>


            </header>
        )
    }
});

module.exports = Menu;