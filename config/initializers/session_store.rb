# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_cms_session',
  :secret      => 'b73417037dc072219e4f86230ab68460563c42461e5e0f3e969183204d3fb8da8947904de8a0a86fb7c24a3d8bbc6c46297d21c7e4ffb55822e70561adaac908'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
