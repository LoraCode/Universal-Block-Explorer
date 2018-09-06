class TypesController < ApplicationController

  def index
    render json: {types: Type.all}
  end

  def show
    @type = Type.find(params[:id])
    render json: { type: @type }
  end

end
