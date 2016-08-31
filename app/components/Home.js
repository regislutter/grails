/**
 * Created by rlutter on 16-08-17.
 */

var React = require('react');
var ReactRouter = require('react-router');

var Home = React.createClass({
    drawWinners: function () {

    },

    handleContinue: function (route, index) {
        swal({
            title: 'Are you sure?',
            text: "It's dangerous to go alone.",
            imageUrl: 'http://zeldawiki.org/images/1/14/OldManSprite.png',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Give me the sword!'
        }).then(function() {
            this.props.onGoTo(route, index);
        }.bind(this)).catch((ui) => {
            // console.log('cancel');
        });
    },

    render: function () {
        var listWinners = '';
        if(this.state.winners.length > 0) {
            listWinners =  <ul class="list-group">
                <li class="list-group-item"></li>
            </ul>
        }

        return (
            <div className="slide">
                <h1>Grail Winner Picker</h1>

                <h3>Gamblers list</h3>
                <textarea></textarea>
                <h3>Winners</h3>
                { listWinners }
                <button onClick={this.drawWinners} type="button" className="btn btn-primary">Choose!</button>
            </div>
        )
    }
});

module.exports = Home;