var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');


// Stateless functional component
function SelectLanguage(props) {
  var languages = ['All', 'Javascript', 'Ruby', 'Java', 'Go', 'CSS'];

  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: 'blue' } : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

// Prop Types
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}


SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
}


// Stateful Popular component
class Popular extends React.Component {

  // initial state
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    // bind this to function
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }

  // update state
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  render() {
    return (
     <div>
       <SelectLanguage
        selectedLanguage={this.state.selectedLanguage}
        onSelect={this.updateLanguage}
       />
       {!this.state.repos
        ? <Loading text='Working on it' speed={300}/>
        : <RepoGrid repos={this.state.repos} />}
     </div>
    )
  }
}

module.exports = Popular;
