from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
<<<<<<< HEAD
from django.utils.translation import gettext_lazy as _
=======
from django.utils.translation import ugettext_lazy as _
>>>>>>> b8f188b (增加PIR相关应用)

from .models import User


class CustomUserAdmin(UserAdmin):
    list_display = ("id", "email", "created", "modified")
    list_filter = ("is_active", "is_staff", "groups")
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            _("Permissions"),
            {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")},
        ),
    )
    add_fieldsets = ((None, {"classes": ("wide",), "fields": ("email", "password1", "password2")}),)


admin.site.register(User, CustomUserAdmin)
