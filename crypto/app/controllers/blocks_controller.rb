class BlocksController < ApplicationController
  def index
    if params[:asset_id]
      @asset = Asset.find(params[:asset_id])
      @blocks = @asset.blocks
    else
      @blocks = Block.all
    end
    render json: { blocks: @blocks }
  end

  def show
    @block = Block.find(params[:id])
    render json: { block: @block }
  end
end
