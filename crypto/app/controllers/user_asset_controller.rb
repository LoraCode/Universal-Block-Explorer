class UserAssetController < ApplicationController
  def show
    @asset = @user.assets.find(params[:id])
    render json: @asset
  end

  def destroy
    @user.assets.delete(Asset.find(params[:id]))
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:user_id])
    end
end
