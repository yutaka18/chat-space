json.array! @messages do |message|
  json.name message.user.name
  json.created_at format_posted_time(message.created_at)
  json.body message.body
  json.image message.image.url
  json.id message.id
end

