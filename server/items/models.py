from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=0)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name
