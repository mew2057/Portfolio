Portfolio::Application.routes.draw do
	root to: "home#index"  
	get "portfolio/index"
	resources :games, only: [:show]
	resources :others, only: [:show]
	get '/portfolio/', to:'portfolio#index'
	get '/home/', to:'home#index'
 end


