  json.body @message.body
  json.image @message.image.url
  json.name @message.user.name
  json.created_at format_posted_time(@message.created_at)