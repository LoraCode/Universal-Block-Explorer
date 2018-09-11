class AssetsController < ApplicationController
  # before_action :set_user, only: [:index, :show, :create, :update, :destroy]
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
    # @user
    # p current_user.inspect
    # p @user
    if params[:user_id]
      @user = User.find(params[:user_id])
      @asset = @user.assets.find(params[:id])
    else
      @asset = Asset.find(params[:id])
    end
    render json: { asset: @asset }, include: %i[blocks types]
  end

  def create
    if params[:user_id]
      @user = User.find(params[:user_id])
      @asset = Asset.find(asset_params['id'])
      @user.assets << @asset
    end
    render json: { asset: @asset }
  end

  def update
    @asset = Asset.find(params[:id])
    @asset.update(rank: asset_params['rank'])
    render json: { asset: @asset }
  end

  def destroy
    if params[:user_id]
      @user = User.find(params[:user_id])
      @asset = Asset.find(asset_params['id'])
      @user.assets.delete(@asset)
    end
    render json: { deletedAsset: @asset }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:user_id])
    end

    def asset_params
      params.require(:asset).permit(:id, :rank)
    end

end
