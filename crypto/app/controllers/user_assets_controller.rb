class UserAssetsController < ApplicationController
  def create
    @user.assets << Asset.find(asset_params)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def asset_params
      params.require(:asset).permit(:id)
    end
end
