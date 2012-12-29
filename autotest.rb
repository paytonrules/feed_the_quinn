#require('terminal-notifier')

watch('script/feed_the_quinn/.*.js') do 
  val = Kernel.system("npm test")
  if (val) 
    Kernel.system("jake bundle")
#   TerminalNotifier.notify("bundled")
  end
end

watch('test/feed_the_quinn/.*_spec.js') do |match|
  Kernel.system("mocha #{match}")
end
