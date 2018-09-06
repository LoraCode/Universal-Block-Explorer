# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Asset.delete_all
Type.delete_all

currency = Type.create(name: 'Currency')
platform = Type.create(name: 'Platform')

bitcoin = Asset.create!(
  name: 'Bitcoin',
  type_id: currency.id
)

ethereum = Asset.create!(
  name: 'Ethereum',
  type_id: platform.id
)

Block.create!(
  block_hash: '000000000000000000133934217dc7cf654ab9d5cc9ce66d60f1261457f0da7c', 
  transaction_num: 461,
  asset: bitcoin
)

Block.create!(
  block_hash: '00000000000000000026443299fdd1aaccfc1e71681b0f62c83961976d858e98',
  transaction_num: 649,
  asset: bitcoin
)

Block.create!(
  block_hash: '0000000000000000000094a1b7d7cbe597294ee280634c9ef371fa708b3c480c',
  transaction_num: 1472,
  asset: bitcoin
)

Block.create!(
  block_hash: '0xc3f70580db732210ba0f0afd872b4d283e95944c576d1c1a42b01b23dab8f90e',
  transaction_num: 77,
  asset: ethereum
)

Block.create!(
  block_hash: '0x792766213ebd1c6f8e61df7e773836ef5d9fec59dcede3803d37679893686add',
  transaction_num: 176,
  asset: ethereum
)

Block.create!(
  block_hash: '0x48d12bd3b1c30cf9a2838a64c67d9c30e1d00175e6a26ddb31019c9e779bbffc',
  transaction_num: 81,
  asset: ethereum
)
