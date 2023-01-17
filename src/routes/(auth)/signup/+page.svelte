<h1 class="auth-heading">Sign Up</h1>

<form action="">
  <div class="field">
    <label for="FullName" class="text-yellow-400">Full Name</label>
    <input type="text" name="fullName" id="fullName" required />
  </div>
  <div class="field">
    <label for="email" class="text-yellow-400">Email Address</label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="field">
    <label for="password" class="text-yellow-400">Password</label>
    <input type="password" name="password" id="password" required />
  </div>
  <div class="field">
    <label for="confirmPassword" class="text-yellow-400">Confirm Password</label>
    <input type="password" name="confirmPassword" id="confirmPassword" required />
  </div>
  <button type="submit" class="auth-button">Sign Up</button>
  <p class="mt-4 text-center text-sm text-white">
    <a href="/login" class="underline hover:no-underline">Already have an account?</a>
  </p>
</form>

<style class="postcss">
  input {
    @apply w-72;
  }
</style>
