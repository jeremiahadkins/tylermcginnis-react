var React = require('react');

class Popular extends React.Component {
  // initial state
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };

    // bind this to function
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  // update state
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang
      }
    });
  }

  render() {
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'Go', 'CSS'];
    return (
      <ul className='languages'>
        {languages.map(function (lang) {
          return (
            <li
              style={lang === this.state.selectedLanguage ? { color: 'blue' } : null }
              onClick={this.updateLanguage.bind(null, lang)}
              key={lang}>
              {lang}
            </li>
          )
        }, this)}
      </ul>
    )
  }
}

module.exports = Popular;
