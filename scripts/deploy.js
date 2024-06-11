import gh from 'gh-pages'

function onDeployed() {
  console.log('Deployed! 🚀')
}

gh.publish(
  'out',
  {
    branch: 'pages',
    nojekyll: true,
  },
  onDeployed
)
