class AssetsController < ApplicationController

  def index
    if (params[:type_id])
      @assets = Asset.find(params[:type_id])
    else
      @assets = Asset.all
    end
    render json: { assets: @assets }
  end

  def show
    @asset = Asset.find(params[:id])
    render json: { asset: @asset}
  end

end
