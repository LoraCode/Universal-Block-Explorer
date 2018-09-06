class BlocksController < ApplicationController
  def index
    if (params[:asset_id])
      @blocks = Block.where(asset_id: params[:asset_id])
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
