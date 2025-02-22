<template>
	<footer class="bg-white border-t border-gray-200 py-12">
		<div class="container mx-auto px-14">
			<div class="flex gap-16">
				<!-- Logo -->
				<div class="flex-shrink-0">
					<img
						src="~/assets/images/logo.png"
						alt="Kampitik Store"
						class="h-8"
					>
				</div>

				<!-- Contacts -->
				<div class="flex-1">
					<h3 class="font-bold mb-4">Contacts</h3>
					<div class="space-y-3">
						<div class="flex items-center gap-2">
							<img
								src="~/assets/icons/location.svg"
								alt="Location"
								class="w-5 h-5"
							>
							<span>Tole bi 59</span>
						</div>
						<div class="flex items-center gap-2">
							<img src="~/assets/icons/mail.svg" alt="Email" class="w-5 h-5" >
							<a href="mailto:kampitik@gmail.com" class="hover:text-primary">
								kampitik@gmail.com
							</a>
						</div>
						<div class="flex items-center gap-4">
							<a href="#" class="hover:opacity-80">
								<img
									src="~/assets/icons/whatsapp.svg"
									alt="WhatsApp"
									class="w-5 h-5"
								>
							</a>
							<a href="#" class="hover:opacity-80">
								<img
									src="~/assets/icons/instagram.svg"
									alt="Instagram"
									class="w-5 h-5"
								>
							</a>
						</div>
					</div>
				</div>

				<!-- About -->
				<div class="flex-1">
					<h3 class="font-bold mb-4">About</h3>
					<ul class="space-y-2">
						<li>
							<a href="#" class="hover:text-primary">Our story</a>
						</li>
						<li>
							<a href="#" class="hover:text-primary">Contact us</a>
						</li>
					</ul>
				</div>

				<!-- Customer -->
				<div class="flex-1">
					<h3 class="font-bold mb-4">Customer</h3>
					<ul class="space-y-2">
						<li>
							<a href="#" class="hover:text-primary">Search</a>
						</li>
						<li>
							<a href="#" class="hover:text-primary">Account</a>
						</li>
						<li>
							<a href="#" class="hover:text-primary">Track my order</a>
						</li>
					</ul>
				</div>

				<!-- Policy -->
				<div class="flex-1">
					<h3 class="font-bold mb-4">Policy</h3>
					<ul class="space-y-2">
						<li>
							<a href="#" class="hover:text-primary">Certificates</a>
						</li>
						<li>
							<a href="#" class="hover:text-primary">Shipping & delivery</a>
						</li>
						<li>
							<a href="#" class="hover:text-primary">Orders & payment policy</a>
						</li>
						<li>
							<a href="#" class="hover:text-primary">Warranty policy</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts"></script>

<style scoped>
	.text-primary {
		color: #3490dc;
	}
</style>
