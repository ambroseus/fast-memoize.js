function strategy (fn, options) {
  function monadic () {
    var cacheKey = arguments[0]

    if (!memoized._cache.has(cacheKey)) {
      memoized._cache.set(cacheKey, fn.apply(this, arguments))
    }

    return memoized._cache.get(cacheKey)
  }

  function variadic () {
    var cacheKey = options.serializer(arguments)

    if (!memoized._cache.has(cacheKey)) {
      memoized._cache.set(cacheKey, fn.apply(this, arguments))
    }

    return memoized._cache.get(cacheKey)
  }

  var memoized = fn.length === 1
    ? monadic
    : variadic

  memoized._cache = options.cache.create()
  memoized._name = 'strategy: Infer arity, cache: ' + options.cache.name + ', serializer: ' + options.serializer._name

  return memoized
}

module.exports = strategy