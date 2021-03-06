###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end


  # Build stat pages
  data['organizers'].each do |organizer|
    # puts organizer
    # puts organizer[:name]
    proxy "/statistics/#{organizer.generatedUrl}.html", "/statistics/template.html", :locals => {
      :organizer_name => organizer[:name],
      :line_data_url => organizer[:line_data_url],
      :line_data_name => organizer[:line_data_name],
      :donut_data_url => organizer[:donut_data_url],
      :donut_data_name => organizer[:donut_data_name],
      :bar_data_name => organizer[:bar_data_name],
      :bar_data_url => organizer [:bar_data_url]
      }, :ignore => true
  end


set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Activate LiveReload
activate :livereload

# Use relative URLs
# activate :relative_assets

# Directory
activate :directory_indexes

# Build-specific configuration
configure :build do


  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
