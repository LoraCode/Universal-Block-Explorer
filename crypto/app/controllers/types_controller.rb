class TypesController < ApplicationController
  def index
    render json: { types: Type.all }, include: :assets
  end

  def show
    @type = Type.find(params[:id])
    render json: { type: @type }, include: :assets
  end
end
