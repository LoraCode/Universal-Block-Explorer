class AssetsController < ApplicationController
  def index
    if (params[:type_id])
      @type = Type.find(params[:type_id])
      @assets = @type.assets
    else
      @assets = Asset.all
    end
    render json: { assets: @assets }, include: :blocks
  end

  def show
    @asset = Asset.find(params[:id])
    render json: { asset: @asset }, include: :blocks
  end

  def update

  end

end
