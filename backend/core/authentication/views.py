from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User

from .serializers import UserSerializer


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            data = request.data

            first_name = data["first_name"]
            last_name = data["last_name"]
            username = data["username"]
            password = data["password"]
            re_password = data["re_password"]

            if password == re_password:
                if len(password) >= 6:
                    if not User.objects.filter(username=username).exists():
                        User.objects.create_user(
                            first_name=first_name,
                            last_name=last_name,
                            username=username,
                            password=password,
                        )
                        if User.objects.filter(username=username).exists():
                            return Response(
                                {"success": "User created successfully"},
                                status=status.HTTP_201_CREATED,
                            )
                        else:
                            return Response(
                                {"error": "Something went wrong creating user"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            )
                    else:
                        return Response(
                            {"error": "Username already exists"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )
                else:
                    return Response(
                        {"error": "Password must be at least 6 characters long"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            else:
                return Response(
                    {"error": "Passwords do not match"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            print(e)
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LoadUserView(APIView):
    def get(self, request):
        try:
            user = request.user
            user_json = UserSerializer(user).data
            return Response({"user": user_json}, status=status.HTTP_200_OK)
        except:
            return Response(
                {"error": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
