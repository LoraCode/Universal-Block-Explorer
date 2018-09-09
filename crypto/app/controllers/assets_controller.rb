class AssetsController < ApplicationController
  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      @assets = @user.assets
    # elsif params[:type_id]
    #   @type = Type.find(params[:type_id])
    #   @assets = @type.assets
    else
      @assets = Asset.all
    end
    render json: { assets: @assets }, include: %i[blocks types]
  end

  def show
    @asset = Asset.find(params[:id])
    render json: { asset: @asset }, include: %i[blocks types]
  end

  def update

  end

end
