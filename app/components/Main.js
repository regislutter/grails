/**
 * Created by rlutter on 16-08-17.
 */

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require("../assets/sass/styles.scss");

var Translate   = require('react-translate-component');
var LocaleSwitcher = require('./LocaleSwitcher');

var Main = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            textGamblers: "",
            gamblers: [],
            winners: [],
            drawFinished: false,
            selectedRaffle: 'raffle',
            nbWinners: 4
        }
    },

    handleChooseWinners: function() {
        if(this.state.winners.length > 0) {
            swal({
                title: 'Draw again?',
                text: "Are you sure to draw again the winners?",
                imageUrl: 'http://zeldawiki.org/images/1/14/OldManSprite.png',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yep!'
            }).then(function() {
                this.drawWinners();
            }.bind(this)).catch((ui) => {
                // console.log('cancel');
            });
        } else {
            this.drawWinners();
        }
    },

    drawWinners: function() {
        this.setState({ drawFinished: false });

        var fctWinners = function() {
            var gamblers = this.state.gamblers;
            if(this.state.selectedRaffle == 'raffle'){
                return gamblers[Math.floor(Math.random()*gamblers.length)]
            } else {
                var tmpList = [];
                var cloneGamblers = gamblers.slice(0); // Clone gamblers list for remove winners
                for (var i = 0; i < this.state.nbWinners; i++) {
                    var selected = Math.floor(Math.random()*cloneGamblers.length);
                    tmpList.push(cloneGamblers[selected]);
                    cloneGamblers.splice(selected, 1); // Remove winner from the list
                }
                return tmpList;
            }
        }.bind(this);

        this.animateDraw( function(){ this.setState({ winners: fctWinners() })}.bind(this), 10, 30 );
    },

    animateDraw: function(callback, factor, times) {
        var main = this;
        var internalCallback = function( t, counter )
        {
            return function()
            {
                if ( --t > 0 )
                {
                    window.setTimeout( internalCallback, ++counter * factor );
                    callback();
                } else {
                    main.setState({ drawFinished: true });
                }
            }
        }( times, 0);

        window.setTimeout( internalCallback, factor );
    },

    handleClickMenu: function(route, index) {
        if(route !== this.state.route) {
            this.context.router.push(route);
        }
        this.setState({
            route: route,
            slideIndex: index
        });
    },

    handleChangeIndex: function(index, fromIndex) {
        this.setState({
            slideIndex: index
        });
    },

    handleTextChange: function(event) {
        var textValue = event.target.value;
        this.setState({textGamblers: textValue});
        var textLines = textValue.split(/\n/);
        var listGamblers = [];
        for (var i = 0; i < textLines.length; i++) {
            var tmpText = textLines[i];
<<<<<<< HEAD
            //if(parseInt(tmpText.charAt(0)) != 'NaN'){
            //    if(tmpText.indexOf('.') >= 0){
            //        tmpText = tmpText.substr(tmpText.indexOf('.')+1);
            //    } else if (tmpText.indexOf(' ') > 0) {
            //        tmpText = tmpText.substr(tmpText.indexOf(' ')+1);
            //    }
            //}
=======
            if(parseInt(tmpText.charAt(0)) != 'NaN'){
                if(tmpText.indexOf('.') >= 0){
                    tmpText = tmpText.substr(tmpText.indexOf('.')+1);
                }
            }
>>>>>>> ca129c5d8a5e416a9354666cd772f7a570b9925b
            listGamblers.push(tmpText.trim());
        }
        this.setState({
            gamblers: listGamblers
        });
    },

    handleRaffleChange: function(event) {
        this.setState({
            selectedRaffle: event.target.value
        });
    },

    handleNbWinners: function(event) {
        this.setState({
            nbWinners: event.target.value
        });
    },

    render: function () {
        var listWinners = 'None';
        var rowWinners = [];
        if(typeof this.state.winners === 'string') {
            listWinners = <p className={(this.state.drawFinished?'final-winner':'')}>{ this.state.winners }</p>
        } else if(this.state.winners.length > 1) {
            this.state.winners.forEach( function(winner) {
                rowWinners.push(<li className="list-group-item">{winner}</li>);
            });
            listWinners = <ul className={"list-group" + (this.state.drawFinished?' final-winner':'')}>
                {rowWinners}
            </ul>
        }

        return (
            <div className="container">
                <LocaleSwitcher />
                <h1><Translate content="home.title" /></h1>
                <p><Translate content="home.by" /> <a href="http://boxandpop.com" target="_blank">BoxAndPop.com</a></p>
                <form>
                    <div className="form-group">
                        <label for="gamblers"><Translate content="home.gamblers" /></label>
                        <textarea id="gamblers" className="form-control" rows="5" value={this.state.textGamblers} onChange={this.handleTextChange}></textarea>
                    </div>
                    <fieldset className="form-group">
                        <legend><Translate content="home.typeraffle" /></legend>
                        <div className="radio">
                            <label>
                                <input type="radio" name="raffleType" id="raffle" value="raffle" checked={this.state.selectedRaffle === 'raffle'} onChange={this.handleRaffleChange} />
                                <Translate content="home.raffle" />
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="raffleType" id="miniraffle" value="miniraffle" checked={this.state.selectedRaffle === 'miniraffle'} onChange={this.handleRaffleChange} />
                                <Translate content="home.miniraffle" />
                                    <div className="form-group">
                                        <label for="nbWinners"><Translate content="home.nbwinners" /></label>
                                        <select className="form-control" id="nbWinners" onChange={this.handleNbWinners}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option selected>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                        </select>
                                    </div>
                            </label>
                        </div>
                    </fieldset>
                    <button onClick={this.handleChooseWinners} type="button" className="btn btn-primary"><Translate content="home.pick" />!</button>
                </form>
                <br/>
                <h3><Translate content="home.winner" />{(this.state.selectedRaffle == 'miniraffle'?'s':'')}</h3>
                { listWinners }
            </div>
        )
    }
});

module.exports = Main;
