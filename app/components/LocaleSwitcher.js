'use strict';

var counterpart = require('counterpart');
var React       = require('react');
var Translate   = require('react-translate-component');

var LocaleSwitcher = React.createClass({
    handleChange: function(e) {
        var lang = e.target.value;
        counterpart.setLocale(lang);
        localStorage.setItem('grailpick.lang', lang);
    },

    componentWillMount: function() {
        var lang = localStorage.getItem('grailpick.lang');
        if(lang === null || lang === undefined || (lang != 'en' && lang != 'fr')) {
            lang = 'en';
        }
        counterpart.setLocale(lang);
    },

    render: function() {
        return (
            <div className="form-group row">
                <div className="col-xs-9"></div>
                <label className="col-xs-2 col-form-label" for="language"><Translate content="lang.switch" />:</label>
                <div className="col-xs-1">
                    <select className="form-control" id="language" defaultValue={counterpart.getLocale()} onChange={this.handleChange}>
                        <option>en</option>
                        <option>fr</option>
                    </select>
                </div>
            </div>
        );
    }
});
module.exports = LocaleSwitcher;

// Translations
var localeEn = require('../locale-data/en.js');
var localeFr = require('../locale-data/fr.js');

counterpart.registerTranslations('en', localeEn);
counterpart.registerTranslations('fr', localeFr);