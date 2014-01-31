Portfolio::Application.routes.draw do
  get "portfolio/index"
  root to: "home#index"
  
  resources :games, only: [:show]
  resources :others, only: [:show]
  get '/portfolio/', to:'portfolio#index'
 end


