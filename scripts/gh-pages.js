import gh from 'gh-pages'

function onDeployed(err) {
  if (err) console.error(err)
  else console.log('Deployed! 🚀')
}

gh.publish(
  'out',
  {
    branch: 'pages',
    nojekyll: true,
  },
  onDeployed
)
