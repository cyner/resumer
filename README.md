# Resumér #

Simple single page demo WebApp scripted using Ember.JS and Rails as a backend.

Demo can be found at [resumer.deployment.cz](http://resumer.deployment.cz)

## Installing ##

    $ git@github.com:cyner/resumer.git

### Backend

    $ cd backend
    $ bundle
    $ cp config/database.yml.example config/database.yml
    $ bundle exec rake db:setup
    $ bundle exec rails s

### Frontend

    $ cd frontend
    $ npm install -g ember-cli
    $ npm install
    $ bower install
    $ ember server --proxy http://localhost:3000

## Running Tests

### Frontend

    $ npm install phantomjs -g
    $ ember test

### Backend

    $ cd backend
    $ bundle exec rspec

## Contributing

1. Fork it ( https://github.com/cyner/resumer/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
