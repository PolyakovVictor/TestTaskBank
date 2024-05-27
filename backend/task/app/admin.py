from django.contrib import admin
from .models import Bank


class BankAdmin(admin.ModelAdmin):
    list_display = ("bank_name", "routing_number", "swift_bic")
    search_fields = ("bank_name", "routing_number", "swift_bic")


admin.site.register(Bank, BankAdmin)
