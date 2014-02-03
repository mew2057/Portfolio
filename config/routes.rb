Portfolio::Application.routes.draw do
  get "portfolio/index"
  root to: "home#index"
  
  resources :games, only: [:show]
  resources :others, only: [:show]
  get '/portfolio/', to:'portfolio#index'
  
   if Rails.env.development?
    app = ActionDispatch::Static.new(
      lambda{ |env| [404, { 'X-Cascade' => 'pass'}, []] },
      Rails.application.config.paths['public'].first,
      Rails.application.config.static_cache_control
    )

    mount app, :at => '/', :as => :public
  end
 end


